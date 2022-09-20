from bs4 import BeautifulSoup
from termcolor import colored
from requests import get
import argparse
import json
import sys

parser = argparse.ArgumentParser(description='Fetch users and related domains from a given github repository.')
parser.add_argument("-r", "--repo", action="store", metavar="REPO", dest="repo",help="Repository to search")
args = parser.parse_args()

repository = args.repo
baseURL = "https://github.com"
branch = "/tree/"
headers = {"User-Agent" : "Chrome 20.10.1"}

def yellow(text):
    return colored(text, 'yellow', attrs=['bold'])

def green(text):
    return colored(text, 'green', attrs=['bold'])

def cyan(text):
    return colored(text, 'cyan', attrs=['bold'])

def red(text):
    return colored(text, 'red', attrs=['bold'])


def fetchLinks(repo,visited,commits):
    if repo in visited:
        return
    folders = []
    try:
        page = get(repo,headers=headers)
    except:
        return
    visited.add(repo)
    soup = BeautifulSoup(page.content, "html.parser")
    for link in soup.find_all("a"):
        href = link.get("href")
        if branch in href:
            folders.append(f"{baseURL}{href}")
        elif "/commit/" in href:
            commits.add(f"{baseURL}{href}.patch")
    if not folders:
        return
    else:
        for folder in folders:
            fetchLinks(folder,visited,commits)
    return commits


def topLevelFetch(repo,visited=set(),commits=set()):
    global branch
    folders = []
    page = get(repo,headers=headers)
    visited.add(repo)
    soup = BeautifulSoup(page.content, "html.parser")
    counter = 0
    for link in soup.find_all("a"):
        href = link.get("href")
        if not href:
            continue
        if "/tree/" in href:
            counter += 1
            if counter > 3:
                folders.append(f"{baseURL}{href}")
        elif "/commit/" in href:
            commits.add(f"{baseURL}{href}.patch")
    if not folders:
        return commits
    else:
        branch += folders[0].split("/tree/")[-1].split("/")[0]+ "/"
        for folder in folders:
            print(yellow(f"Analysing folder {folder}"),"=>>",green(f"{len(commits)} commits"))
            fetchLinks(folder,visited,commits)
    return commits


def saveJSON(emails,commitsCount,emailsCount):
    filename = repository.split("/")[-1]
    metaData = {"repository" : repository, "totalCommits": commitsCount, "totalEmails" : emailsCount}
    data = { "metaData" : metaData ,"domains" : list(emails.keys()) ,"emails" : emails}
    outfile = open(f"outputs/{filename}.json", "w")
    json.dump(data,outfile,indent=4)
    outfile.close()


def getEmailId(url):
    try:
        resp = get(url,headers=headers,timeout=5)
        email = resp.text.split("\n")[1].split(" ")[-1][1:-1]
        if "@" in email and not email.endswith("users.noreply.github.com"):
            return email,url
        else:
            return None,None
    except:
        return None,None

def filterDomains(allEmails):
    emails = {}
    for email in allEmails:
        domain = email.split("@")[-1]
        emails[domain] = emails.get(domain,[]) + [email]
    return emails

def run():
    print(cyan(f"RUNNIG SELENA on respo --> {repository}\n"))
    allEmails = set()
    try:
        allCommits = topLevelFetch(repository)
    except:
        print(red("Error !!"), cyan("check your repo url or give a public repo url"))
        sys.exit(4)
    print(green(f"\nGot {len(allCommits)} commits from repository\n"))
    for commit in allCommits:
        email,_ = getEmailId(commit)
        if email:
            allEmails.add(email)
    emails = filterDomains(allEmails)
    saveJSON(emails,len(allCommits),len(allEmails))
    print(green(f"Found {len(allEmails)} emails from this repository\n"))
    print(cyan("Results are saved in outputs directory !!"))

run()