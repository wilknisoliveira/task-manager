pipeline {
    agent any
    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch name')
    }

    stages {
        stage('Build and Run') {
            when {
                expression { BRANCH ==~ /(main)/ }
            }
            steps {
                echo 'Running docker-compose'
                sh 'docker-compose up -d'
            }
        }
        stage('DockerHub') {
            steps {
                echo 'Pushing image to DockerHub'
                withCredentials([string(credentialsId: 'docker-hub', variable: 'dockerHubPwd')]) {
                    sh 'docker login -u wilknis -p ${dockerHubPwd}'
                    sh 'docker push wilknis/task-manager:v1'
                }
            }
        }
    }
}