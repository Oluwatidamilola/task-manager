provider "aws" {
  region  = "us-east-1"
  profile = "AdministratorAccess-588577234645"
}

data "aws_caller_identity" "current" {}

output "account_id" {
  value = data.aws_caller_identity.current.account_id
}
