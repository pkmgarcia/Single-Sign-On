pipeline {
  agent any
  stages {
    stage('Install') {
      parallel {
        stage('Install') {
          steps {
            dir(path: 'client') {
              sh 'npm install'
            }

          }
        }
        stage('test') {
          steps {
            sh 'which npm'
          }
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
    stage('Deploy') {
      steps {
        sh 'sudo pm2 start npm -- start'
      }
    }
  }
}