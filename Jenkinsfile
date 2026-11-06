pipeline {
    agent any
    stages {
        stage('Build image') {
            steps {
                sh 'docker build -t pw-tests:${BUILD_NUMBER} .'
            }
        }
        stage('Run tests') {
            steps {
                sh 'docker run --rm pw-tests:${BUILD_NUMBER} npx playwright test --reporter=list'
            }
        }
    }
}