pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh './scripts/clean.sh'
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