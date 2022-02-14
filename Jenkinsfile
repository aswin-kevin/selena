pipeline {
    agent { label 'jenkins-slave-1' } 
    stages {
        stage('Build output folder') {
            steps {
                echo 'Started building new website source code'
                sh 'sudo npm i && sudo npm run export'
            }
        }
        // stage('Deleting previous images') {
        //     steps {
        //         echo 'Deleting previously deployed containers'
        //         sh 'mvn -B clean verify'
        //     }
        // }
        stage('Build docker image') {
            steps {
                echo 'Started building docker image'
                sh 'sudo docker build -t aswin/selena:latest .'
            }
        }
        stage('Deploy docker image') {
            steps {
                echo 'New version of website deployment started'
                sh 'sudo docker run -d -p 8001:80 --name selena aswin/selena:latest'
            }
        }
    }
}