pipeline{
    agent any
    stages{
        stage('test'){
            steps{
                echo 'hello test'
            }
        }
        stage('build'){
            steps{
                npm install
                npm run build
            }
        }
        stage('deliver'){
            steps{
                echo 'hello deliver'
            }
        }
    }
}
