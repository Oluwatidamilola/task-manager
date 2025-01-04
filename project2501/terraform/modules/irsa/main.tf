# Fetch the OIDC provider URL for the EKS Cluster
data "aws_eks_cluster" "eks_cluster" {
  name = var.cluster_name
}

data "aws_eks_cluster_auth" "eks_cluster_auth" {
  name = var.cluster_name
}

# IAM OpenID Connect provider for EKS
resource "aws_iam_openid_connect_provider" "oidc_provider" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["9e99a48a9960b14926bb7f3b12cfe9e7e1d7f8a4"] # Use the default Amazon OIDC thumbprint
  url             = data.aws_eks_cluster.eks_cluster.identity[0].oidc[0].issuer
}

# IAM Role for the Kubernetes Service Account
resource "aws_iam_role" "irsa_role" {
  name               = format("%s-irsa-role", var.service_account_name)
  assume_role_policy = templatefile("${path.module}/assume-role-policy.json", {
    oidc_provider_url = aws_iam_openid_connect_provider.oidc_provider.url
    namespace         = var.namespace
    service_account   = var.service_account_name
  })

  tags = var.tags
}

# IAM Policy to attach to the role
resource "aws_iam_policy" "irsa_policy" {
  name        = format("%s-irsa-policy", var.service_account_name)
  path        = "/"
  description = "IAM Policy for IRSA role"
  policy      = var.policy_json

  tags = var.tags
}

# Attach the policy to the role
resource "aws_iam_role_policy_attachment" "irsa_policy_attachment" {
  role       = aws_iam_role.irsa_role.name
  policy_arn = aws_iam_policy.irsa_policy.arn
}
