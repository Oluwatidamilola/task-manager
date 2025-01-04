output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security group ID of the EKS cluster"
  value       = module.eks.cluster_security_group_id
}

output "eks_cluster_id" {
  description = "EKS cluster ID"
  value       = module.eks.cluster_id
}

output "eks_managed_node_group_names" {
  description = "Names of EKS managed node groups"
  value       = keys(module.eks.eks_managed_node_groups)
}

output "eks_managed_node_groups_debug" {
  value = module.eks.eks_managed_node_groups
}

output "eks_managed_node_group_arns" {
  description = "ARNs of EKS managed node groups"
  value       = [for ng in values(module.eks.eks_managed_node_groups) : ng.node_group_arn]
}
