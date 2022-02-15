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
            }
        }
        stage('Push to dockerhub') {
            steps {
                echo 'New version push to db'
                withDockerRegistry(credentialsId: 'aswin-dockerhub', url: 'https://index.docker.io/v1/') {
                    sh 'cd $WORKSPACE'
                    sh 'sudo docker build --tag aswinkevin/selena:$BUILD_NUMBER .'
                    sh 'sudo docker push aswinkevin/selena:$BUILD_NUMBER'
                }
            }
        }
    }
}