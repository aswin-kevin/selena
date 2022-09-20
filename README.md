## SELENA

`(Know who developed the repository)`

- _selena_ is a python tool used to fetch developer user emails of a given github repository

![example resulant emails](https://www.linkpicture.com/q/Screenshot-2022-09-20-164825.png)

**NOTE**

- This is not a github code scanner
- Private repositories won't work

**WHO CAN USE**

- Someone who wants to know the developers of a particular repo.
- Someone who wants to check which domain the repository belongs to.

**How it works !!**

- Fetches all the commits from a given github repository
- It analyses all the commits and fetch the user email ID associated with that repository.

**STEPS TO INSTALL**

- Clone the github repository
  > `git clone https://github.com/aswin-kevin/selena`
- Install python libraries
  > `pip3 install -r requirements.txt`

**STEPS TO RUN**

- pass the repository name with _-r_ flag

  > `python3 selena.py -r <repo-url>`
  > pass the repo url not the account url which contains multiple repositories

- For example if your repo url is *https://github.com/aws/aws-cdk*
  > `python3 selena.py -r https://github.com/aws/aws-cdk`

**OUTPUT**

- Output will be saved in a directory called `outputs`
- Output format is _JSON_

![resultant cli image](https://www.linkpicture.com/q/Screenshot-2022-09-20-164654.png)

**For more information**

- Contact me [Hackwithash](https://www.hackwithash.com)
- Follow me on [Linkedin](https://www.linkedin.com/in/aswin-venkat-ceo/)
