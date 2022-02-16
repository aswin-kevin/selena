pipeline {
    agent { label 'jenkins-slave-1' } 
    environment {
		DOCKERHUB_CREDENTIALS=credentials('aswin-dockerhub')
	}
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
                sh 'sudo docker build -t aswinkevin/selena:$BUILD_NUMBER .'
            }
        }
        // stage('Push to dockerhub') {
        //     steps {
        //         echo 'New version push to db'
        //         withDockerRegistry(credentialsId: 'aswin-dockerhub', url: 'https://index.docker.io/v1/') {
        //             sh script: 'sudo docker push aswinkevin/selena:$BUILD_NUMBER'
        //         }
        //     }
        // }

        stage('Docker Login') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Docker Push') {
			steps {
				sh 'sudo docker push aswinkevin/selena:$BUILD_NUMBER'
			}
		}
    }
    post {
		always {
			sh 'docker logout'
		}
	}
}