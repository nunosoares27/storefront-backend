# Storefront Backend Project

- In this project, it was developed a storefront backend, using node js, typescript, postgres.

## Project Instructions 

1. Todo

## ENVIRONMENT VARIABLES:

TODO

## DB TABLES

## orders_products 
- id SERIAL PRIMARY KEY,
- order_id bigint REFERENCES orders(id),
- product_id bigInt REFERENCES products(id),
- quantity integer

## orders
- id SERIAL PRIMARY KEY,
- user_id bigInt REFERENCES users(id),
- status BOOLEAN

## products 
- id SERIAL PRIMARY KEY,
- price INTEGER NOT NULL,
- name VARCHAR(120) NOT NULL,
- category_id bigInt REFERENCES categories(id)

## categories
- id SERIAL PRIMARY KEY,
- name VARCHAR(100)

## users (
- id SERIAL PRIMARY KEY,
- firstName VARCHAR(80) NOT NULL,
- lastName VARCHAR(80) NOT NULL,
- password VARCHAR(100) NOT NULL


# Endpoints

## Users

### Register **(No Authentication required)**
POST
```localhost:3000/users/register```

Example payload:

```
{
	"firstName" : "Nuno",
	"lastName" : "Soares",
	"password" : "123456"
}
```

Example response:

```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNCwiZmlyc3RuYW1lIjoiTWlndWVsIiwibGFzdG5hbWUiOiJTYW50b3MiLCJwYXNzd29yZCI6IiQyYiQxMCR0Y1B6RnVmcFhLY2tvT1ZRVTM4YWZ1Vk4waVBLUGZOQXkySjZ4R1k0eVRkR0NNWVBnYTFUaSJ9LCJpYXQiOjE2NTE1MjIyMjZ9.0YDxI2K74O-k50SDeLYp1Kso2v-6IzQfg49KJjDDNG0"

```
Then save this token without the " ", to use on protected routes **=)**.
example of usage ```Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....```


### Login **(No Authentication required)**
POST
```localhost:3000/users/login```

Example payload:

```
{
	"firstName" : "Nuno",
	"lastName" : "Soares",
	"password" : "123456"
}
```

Example response:

```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNCwiZmlyc3RuYW1lIjoiTWlndWVsIiwibGFzdG5hbWUiOiJTYW50b3MiLCJwYXNzd29yZCI6IiQyYiQxMCR0Y1B6RnVmcFhLY2tvT1ZRVTM4YWZ1Vk4waVBLUGZOQXkySjZ4R1k0eVRkR0NNWVBnYTFUaSJ9LCJpYXQiOjE2NTE1MjIyMjZ9.0YDxI2K74O-k50SDeLYp1Kso2v-6IzQfg49KJjDDNG0"

```
Then save this token without the " ", to use on protected routes **=)**.
example of usage ```Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....```

### Get all users **(Authentication required)**
GET
```localhost:3000/users```

For security reasons, the password doen't appear on the response.

You need to provide a header with ```Bearer :tokenid```

Example response:

```
[
	{
		"id": 12,
		"firstname": "Nuno",
		"lastname": "Soares"
	},
	{
		"id": 14,
		"firstname": "Miguel",
		"lastname": "Santos"
	}
]
```

### Get user by id **(Authentication required)**
GET
```localhost:3000/users/:id```

For security reasons, the password doen't appear on the response.

You need to provide a header with ```Bearer :tokenid```

Example response:

```
{
	"firstname": "Nuno",
	"lastname": "Soares"
}
```


### Edit user **(Authentication required)**
PUT
```localhost:3000/users/:id```

You need to provide a header with ```Bearer :tokenid```, and provide a payload like below. You don't need to provide everything, you can only supply the params you want to change.

Example payload:

```
{
	"firstName": "Edited",
	"lastName": "User"
}
```


Example response:

```
{
	"message": "User edited with success"
}
```

### Delete user **(Authentication required)**
DELETE
```localhost:3000/users/:id```

You need to provide a header with ```Bearer :tokenid```

Example response:

```
{
	"message": "User deleted with success"
}
```



## Categories

### Get all categories **(No Authentication required)**
GET
```localhost:3000/categories```

Example response:

```
[
	{
		"id": 1,
		"name": "React js ebooks"
	},
	{
		"id": 2,
		"name": "Express js ebooks"
	}
]
```

### Get category by id **(No Authentication required)**
GET
```localhost:3000/categories/:id```

Example response:

```
{
	"id": 1,
	"name": "React js ebooks"
}
```

### Create category **(Authentication required)**
POST
```localhost:3000/categories/```

You need to provide a header with ```Bearer :tokenid```, and provide a payload like below.

Example payload:

```
{
	"name": "Action Movies"
}
```

Example response:

```
{
	"id": 3,
	"name": "Action Movies"
}
```

### Update category **(Authentication required)**
PUT
```localhost:3000/categories/:id```

You need to provide a header with ```Bearer :tokenid```, and provide a payload like below.

Example payload:

```
{
	"name": "Action Movies Edited"
}
```

Example response:

```
{
	"message": "Category edited with success"
}
```

### Delete category **(Authentication required)**
DELETE
```localhost:3000/categories/:id```

You need to provide a header with ```Bearer :tokenid```

Example response:

```
{
	"message": "Category deleted with success"
}
```

## Products


### Get all products **(No Authentication required)**
GET
```localhost:3000/products```

Example response:

```
[
	{
		"id": 3,
		"price": 60,
		"name": "Learn Node js",
		"category_id": 3,
		"category_name": "React js ebooks"
	},
	{
		"id": 5,
		"price": 20,
		"name": "Learn React js",
		"category_id": 3,
		"category_name": "React js ebooks"
	},
	{
		"id": 7,
		"price": 30,
		"name": "Learn Redux js",
		"category_id": 3,
		"category_name": "React js ebooks"
	},
	{
		"id": 8,
		"price": 500,
		"name": "Learn Math and Physics",
		"category_id": null,
		"category_name": null
	}
]
```

### Get product by id **(No Authentication required)**
GET
```localhost:3000/products/:id```

Example response:

```
{
	"id": 8,
	"price": 500,
	"name": "Learn Math and Physics",
	"category_id": null,
	"category_name": null
}
```

### Create product **(Authentication required)**
POST
```localhost:3000/products/```

You need to provide a header with ```Bearer :tokenid```, and provide a payload like below.

Example payload:

```
{
	"name": "Learn Redux js",
	"price": 30,
	"category_id": 3
}
```

Example response:

```
{
	"id": 10,
	"price": 30,
	"name": "Learn Redux js",
	"category_id": "3"
}
```

### Update product **(Authentication required)**
PUT
```localhost:3000/products/:id```

You need to provide a header with ```Bearer :tokenid```, and provide a payload like below. You don't need to provide everything, you can only supply the params you want to change.

Example payload:

```
{
	"price": 500,
	"name": "Learn Math and Physics",
	"category_id": null
}
```

Example response:

```
{
	"message": "Product edited with success"
}
```

### Delete product **(Authentication required)**
DELETE
```localhost:3000/products/:id```

You need to provide a header with ```Bearer :tokenid```

Example response:

```
{
	"message": "Product deleted with success"
}
```

### Get products by category **(No Authentication required)**
GET
```localhost:3000/products/category/:id```

Example response:

```
[
	{
		"id": 3,
		"price": 60,
		"name": "Learn Node js",
		"category_id": "3"
	},
	{
		"id": 5,
		"price": 20,
		"name": "Learn React js",
		"category_id": "3"
	},
	{
		"id": 7,
		"price": 30,
		"name": "Learn Redux js",
		"category_id": "3"
	}
]

```

## Orders


### Get all orders **(Authentication required)**
GET
```localhost:3000/orders```

You need to provide a header authentication with ```Bearer :tokenid```

Example response:

```
[
	{
		"order_id": 7,
		"user_id": 12,
		"firstname": "Nuno",
		"lastname": "Soares",
		"products": [
			{
				"name": "Learn Math and Physics",
				"price": 500,
				"quantity": 2,
				"product_id": 8,
				"category_id": null,
				"category_name": null
			}
		],
		"complete": true
	},
	{
		"order_id": 9,
		"user_id": 14,
		"firstname": "Miguel",
		"lastname": "Santos",
		"products": [],
		"complete": false
	},
]
```


### Get all current orders by user **(Authentication required)**
GET
```localhost:3000/orders/current/:user_id```

You need to provide a header authentication with ```Bearer :tokenid```

Example response:

```
[
	{
		"order_id": 7,
		"user_id": 12,
		"firstname": "Nuno",
		"lastname": "Soares",
		"products": [
			{
				"name": "Learn Math and Physics",
				"price": 500,
				"quantity": 2,
				"product_id": 8,
				"category_id": null,
				"category_name": null
			}
		],
		"complete": false
	},
]
```

### Get all completed orders by user **(Authentication required)**
GET
```localhost:3000/orders/completed/:user_id```

You need to provide a header authentication with ```Bearer :tokenid```

Example response:

```
[
	{
		"order_id": 7,
		"user_id": 12,
		"firstname": "Nuno",
		"lastname": "Soares",
		"products": [
			{
				"name": "Learn Math and Physics",
				"price": 500,
				"quantity": 2,
				"product_id": 8,
				"category_id": null,
				"category_name": null
			}
		],
		"complete": true
	},
]
```

### Get orders by id **(Authentication required)**
GET
```localhost:3000/orders/:id```

You need to provide a header authentication with ```Bearer :tokenid```

Example response:

```
[
	{
		"order_id": 7,
		"user_id": 12,
		"firstname": "Nuno",
		"lastname": "Soares",
		"products": [
			{
				"name": "Learn Math and Physics",
				"price": 500,
				"quantity": 2,
				"product_id": 8,
				"category_id": null,
				"category_name": null
			}
		],
		"complete": true
	},
]
```

### Create order **(Authentication required)**
POST
```localhost:3000/orders```

You need to provide a header with ```Bearer :tokenid```, and provide a payload like below.

Example payload:

```
{
	"user_id": "14",
	"status": false
}
```

Example response:

```
{
	"id": 12,
	"user_id": "14",
	"status": false
}
```

### Update order **(Authentication required)**
PUT
```localhost:3000/orders/:id```

You need to provide a header with ```Bearer :tokenid```, and provide a payload like below. You don't need to provide everything, you can only supply the params you want to change.

Example payload:

```
{
	"user_id": "12",
	"status": true
}
```

Example response:

```
{
	"message": "Order edited with success"
}
```

### Delete order **(Authentication required)**
DELETE
```localhost:3000/orders/:id```

You need to provide a header with ```Bearer :tokenid```

Example response:

```
{
	"message": "Order deleted with success"
}
```


### Add product to order **(Authentication required)**
POST
```localhost:3000/orders/:order_id/product```

You need to provide a header with ```Bearer :tokenid```, and provide a payload like below.

Example payload:

```
{
	"product_id": 8,
	"quantity": 2
}
```

Example response:

```
{
	"id": 26,
	"order_id": "7",
	"product_id": "8",
	"quantity": 2
}
```


### Update product order **(Authentication required)**
PUT
```localhost:3000/orders/:order_id/product```

You need to provide a header with ```Bearer :tokenid```, and provide a payload like below. You don't need to provide everything, you can only supply the params you want to change.

Example payload:

```
{
	"product_id": 8,
	"quantity": 2
}
```

Example response:

```
{
	"message": "Order edited with success"
}
```

### Delete product order **(Authentication required)**
DELETE
```localhost:3000/orders/:order_id/product/:product_id```

You need to provide a header with ```Bearer :tokenid```.


Example response:

```
{
	"message": "Order deleted with success"
}
```