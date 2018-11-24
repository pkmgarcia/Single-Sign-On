pipeline {
  agent {
    docker {
      image 'node:8-alpine'
      args '-u root:root'
    }

  }
  stages {
    stage('Install') {
      steps {
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
    stage('Build') {
      steps {
        dir(path: 'client') {
          sh 'npm run build'
        }

      }
    }
  }
}