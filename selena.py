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

def fetchLinks(masterLink,commits,pageNo):
    print(yellow(f"started scraping page {pageNo}"))
    nextPointer = None
    try:
        page = get(masterLink,headers=headers)
    except:
        return None
    soup = BeautifulSoup(page.content, "html.parser")
    for link in soup.find_all("a"):
        href = link.get("href")
        if "/commit/" in href:
            commits.add(f"{baseURL}{href}.patch")
        elif "?after=" in href:
            nextPointer = href
    if nextPointer is not None:
        fetchLinks(nextPointer,commits,pageNo+1)
    return commits


def getMasterLink(repo):
    try:
        page = get(repo,headers=headers)
    except:
        return
    soup = BeautifulSoup(page.content, "html.parser")
    masterLink = list(filter(lambda link: "/commits/" in link.get("href"), soup.find_all("a")))
    return baseURL+masterLink[0].get("href") if len(masterLink) > 0 else None


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

def saveJSON(emails,commitsCount,emailsCount):
    filename = repository.split("/")[-1]
    metaData = {"repository" : repository, "totalCommits": commitsCount, "totalEmails" : emailsCount}
    data = { "metaData" : metaData ,"domains" : list(emails.keys()) ,"emails" : emails}
    outfile = open(f"outputs/{filename}.json", "w")
    json.dump(data,outfile,indent=4)
    outfile.close()


def run():
    allEmails = set()
    masterLink = getMasterLink(repository)
    if masterLink is None:
        print(red("Error !!"), cyan("check your repo url or give a public repo url"))
        sys.exit(4)
    print(green("Found commits page !"))
    allCommits = fetchLinks(masterLink,set(),1)
    print(green(f"\nFetched {len(allCommits)} commits from this repository"))
    for idx,commit in enumerate(allCommits,start=1):
        sys.stdout.write("\rscraping {0} of {1}".format(idx,len(allCommits)))
        email,_ = getEmailId(commit)
        if email:
            allEmails.add(email)
        sys.stdout.flush()
    print("")
    emails = filterDomains(allEmails)
    saveJSON(emails,len(allCommits),len(allEmails))
    print(green(f"Found {len(allEmails)} emails from this repository\n"))
    print(cyan("Results are saved in outputs directory !!"))

run()