pipeline {
    agent { label 'jenkins-slave-1' } 
    stages {
        stage('Build output folder') {
            steps {
                echo 'Started building new website source code'
                sh 'sudo npm i && sudo npm run export'
            }
        }
        stage('Build docker image') {
            steps {
                echo 'Started building docker image'
                sh 'sudo docker build --tag docker.io/aswinkevin/selena:$BUILD_NUMBER .'
            }
        }
        stage('Push to dockerhub') {
            steps {
                echo 'New version push to db'
                withDockerRegistry(credentialsId: 'aswin-dockerhub', url: 'https://registry.hub.docker.com') {
                    sh 'sudo docker push docker.io/aswinkevin/selena:$BUILD_NUMBER'
                }
            }
        }
    }
}