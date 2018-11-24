pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        dir(path: 'client') {
          sh 'npm install --verbose'
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
    stage('Build') {
      steps {
        dir(path: 'client') {
          sh 'npm run build'
        }

      }
    }
  }
}