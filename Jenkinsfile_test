pipeline {
    agent { label 'jenkins-slave-1' } 
    stages {
        stage('Build output folder') {
            steps {
                echo 'Started building new website source code'
                sh 'sudo npm i && sudo npm run export'
            }
        }
        // stage('Build and Push to dockerhub') {
        //     steps {
        //         echo 'New version push to db'
        //         withDockerRegistry(credentialsId: 'aswin-dockerhub', url: ' https://index.docker.io/v1/') {
        //             sh 'sudo docker build -t docker.io/aswinkevin/selena:$BUILD_NUMBER .'
        //             sh 'sudo docker push docker.io/aswinkevin/selena:$BUILD_NUMBER'
        //         }
        //     }
        // }
    }
}