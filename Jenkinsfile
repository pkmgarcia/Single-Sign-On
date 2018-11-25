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
        stage('Install') {
          steps {
            dir(path: 'server') {
              sh 'npm install'
            }

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
        dir(path: 'scripts') {
          sh './transfer.sh'
          sh './deliver.sh'
        }

      }
    }
  }
}