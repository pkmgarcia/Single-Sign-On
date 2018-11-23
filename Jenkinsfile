pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test -- --coverage'
      }
    }
    stage('Deploy') {
      steps {
        sh 'npm run build'
      }
    }
  }
}