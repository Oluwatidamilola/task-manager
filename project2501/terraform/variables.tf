variable "environment" {
  description = "The environment name (e.g., Development, Staging, Production)"
  type        = string
  default     = "Development" # You can change this default as needed
}

variable "aws_region" {
  description = "AWS region for the environment"
  type        = string
  default     = "ap-northeast-1"
}

variable "aws_profile" {
  description = "The AWS CLI profile to use for authentication"
  type        = string
  default     = "default"  # Replace with "my-profile" if you prefer
}
variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {
    Environment = "Development"
    Project     = "Project2501"
  }
}
