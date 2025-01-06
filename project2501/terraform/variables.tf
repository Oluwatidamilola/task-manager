variable "environment" {
  description = "The environment name (e.g., Development, Staging, Production)"
  type        = string
  default     = "Development"
}

variable "aws_region" {
  description = "AWS region for the environment"
  type        = string
  default     = "ap-northeast-1"
}

variable "aws_profile" {
  description = "The AWS CLI profile to use for authentication"
  type        = string
  default     = "my-profile"
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {
    Environment = "Development"
    Project     = "Project2501"
  }
}

# Missing variables declared here
variable "namespace" {
  description = "The namespace for the service account"
  type        = string
}

variable "service_account_name" {
  description = "The name of the service account"
  type        = string
}
variable "policy_json" {
  description = "Path to the IAM policy JSON file"
  type        = string
}

variable "cluster_name" {
  description = "The name of the EKS cluster"
  type        = string
}
