var	profiles
=	[
		{
			id: 1
		,	profile: 'ACL Manager'
		}
	]
,	users
=	[
		{
			id: 1
		,	profile: 1
		,	username: 'nguidi'
		,	password: '12345'
		}
	,	{
			id: 2
		,	profile: 1
		,	username: 'fsoto'
		,	password: '12345'
		}
	]
,	access
=	[
		{
			id: 1
		,	access: "show"
		,	id_permission: 1
		}
	,	{
			id: 2
		,	access: "list"
		,	id_permission: 1
		}
	,	{
			id: 3
		,	access: "find"
		,	id_permission: 1
		}
	,	{
			id: 4
		,	access: "filter"
		,	id_permission: 1
		}
	]
,	permissions
=	[
		{
			id: 1
		,	permission: "view"
		}
	,	{
			id: 2
		,	permission: "update"
		}
	,	{
			id: 3
		,	permission: "create"
		}
	,	{
			id: 4
		,	permission: "delete"
		}
	,	{
			id: 5
		,	permission: "all"
		}
	]
,	groups
=	[
		{
			id: 1
		,	group: "api"
		}
	,	{
			id: 2
		,	group: "acl"
		}
	]
,	aros_groups
=	[
		{
			id: 1
		,	profile: 1
		,	id_group: 1
		}
	,	{
			id: 2
		,	profile: 1
		,	id_group: 2
		}
	]
,	aros_groups_permissions
=	[
		{
			id: 1
		,	id_aro_group: 1
		,	id_permission: 1
		}
	,	{
			id: 2
		,	id_aro_group: 2
		,	id_permission: 5
		}
	]
,	acos
=	[
		{
			id: 1
		,	aco: "welcomes"
		}
	,	{
			id: 2
		,	aco: "menus"
		}
	,	{
			id: 3
		,	aco: "groups"
		}
	,	{
			id: 4 
		,	aco: "aros"
		}
	,	{
			id: 5
		,	aco: "aros_groups"
		}
	,	{
			id: 6
		,	aco: "aros_groups_permissions"
		}
	,	{
			id: 7
		,	aco: "acos"
		}
	,	{
			id: 8
		,	aco: "acos_assocs"
		}
	,	{
			id: 9
		,	aco: "acos_permissions"
		}
	,	{
			id: 10
		,	aco: "acos_groups"
		}
	,	{
			id: 11
		,	aco: "acos_groups_assoc_permissions"
		}
	,	{
			id: 12
		,	aco: "permissions"
		}
	,	{
			id: 13
		,	aco: "access"
		}
	,	{
			id: 14
		,	aco: "profiles"
		}
	,	{
			id: 15
		,	aco: "users"
		}
	]
,	acos_assocs
=	[
		{
			id: 1
		,	id_aco: 2
		,	id_aco_assoc: 14 
		}
	,	{
			id: 2
		,	id_aco: 3
		,	id_aco_assoc: 5
		}
	,	{
			id: 3
		,	id_aco: 14
		,	id_aco_assoc: 14 
		}
	,	{
			id: 4
		,	id_aco: 5
		,	id_aco_assoc: 3
		}
	,	{
			id: 5
		,	id_aco: 5
		,	id_aco_assoc: 4
		}
	,	{
			id: 6
		,	id_aco: 6
		,	id_aco_assoc: 3
		}
	,	{
			id: 7
		,	id_aco: 6
		,	id_aco_assoc: 12
		}
	,	{
			id: 8
		,	id_aco: 12
		,	id_aco_assoc: 13
		}
	,	{
			id: 9
		,	id_aco: 12
		,	id_aco_assoc: 6
		}
	,	{
			id: 10
		,	id_aco: 12
		,	id_aco_assoc: 9
		}
	,	{
			id: 11
		,	id_aco: 13
		,	id_aco_assoc: 12
		}
	,	{
			id: 12
		,	id_aco: 14
		,	id_aco_assoc: 2
		}
	,	{
			id: 13
		,	id_aco: 14
		,	id_aco_assoc: 15
		}
	,	{
			id: 14
		,	id_aco: 14
		,	id_aco_assoc: 4
		}
	,	{
			id: 15
		,	id_aco: 15
		,	id_aco_assoc: 14
		}
	]
,	acos_permissions
=	[
		{
			id: 1
		,	id_aco: 7
		,	id_permission: 2
		,	allow: false
		}
	,	{
			id: 2
		,	id_aco: 7
		,	id_permission: 3
		,	allow: false
		}
	,	{
			id: 3
		,	id_aco: 7
		,	id_permission: 4
		,	allow: false
		}
	]
,	acos_groups
=	[
		{
			id: 1
		,	id_aco: 1
		,	id_group: 1
		}
	,	{
			id: 2
		,	id_aco: 2
		,	id_group: 1 
		}
	,	{
			id: 3
		,	id_aco: 14
		,	id_group: 1 
		}
	,	{
			id: 4
		,	id_aco: 15
		,	id_group: 1 
		}
	,	{
			id: 5
		,	id_aco: 3
		,	id_group: 2
		}
	,	{
			id: 6
		,	id_aco: 4
		,	id_group: 2
		}
	,	{
			id: 7
		,	id_aco: 5
		,	id_group: 2
		}
	,	{
			id: 8
		,	id_aco: 6
		,	id_group: 2
		}
	,	{
			id: 9
		,	id_aco: 7
		,	id_group: 2
		}
	,	{
			id: 10
		,	id_aco: 8
		,	id_group: 2
		}
	,	{
			id: 11
		,	id_aco: 9
		,	id_group: 2
		}
	,	{
			id: 12
		,	id_aco: 10
		,	id_group: 2
		}
	,	{
			id: 13
		,	id_aco: 11
		,	id_group: 2
		}
	,	{
			id: 14
		,	id_aco: 12
		,	id_group: 2
		}
	,	{
			id: 15
		,	id_aco: 13
		,	id_group: 2
		}
	]
,	acos_groups_assoc_permissions
=	[
		{
			id: 1
		,	id_aco: 12
		,	id_assoc: 13
		,	id_group: 2
		,	id_permission: 2
		,	allow: false
		}
	,	{
			id: 2
		,	id_aco: 12
		,	id_assoc: 13
		,	id_group: 2
		,	id_permission: 3
		,	allow: false
		}
	,	{
			id: 3
		,	id_aco: 12
		,	id_assoc: 13
		,	id_group: 2
		,	id_permission: 4
		,	allow: false
		}
	]