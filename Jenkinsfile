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
                cd client
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
