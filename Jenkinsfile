pipeline {
    agent any
    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch name')
    }

    stages {
        when {
            expression { BRANCH ==~ /(main)/ }
        }
        stage('Build and Run') {
            echo 'Running docker-compose'
            sh 'docker-compose up'
        }
        stage('DockerHub') {
            echo 'Pushing image to DockerHub'
            withCredentials([string(credentialsId: 'docker-hub', variable: 'dockerHubPwd')]) {
                sh 'docker login -u wilknis -p ${dockerHubPwd}'
                sh 'docker push wilknis/task-manager:v1'
            }
        }
    }
}