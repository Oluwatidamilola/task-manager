output "irsa_role_arn" {
  description = "The ARN of the IAM role for the service account"
  value       = aws_iam_role.irsa_role.arn
}

output "oidc_provider_url" {
  description = "The URL of the OIDC provider for the EKS cluster"
  value       = aws_iam_openid_connect_provider.oidc_provider.url
}
