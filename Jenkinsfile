pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'whoami'
        dir(path: 'client') {
          sh 'npm install'
        }

      }
    }
    stage('Test') {
      steps {
        dir(path: 'client') {
          sh 'npm test -- --coverage'
        }

      }
    }
    stage('Deploy') {
      steps {
        sh 'npm run build'
      }
    }
  }
}