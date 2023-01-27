const db =require('./db')

//get all the products from db

const getProducts =()=>{
  return db.Product.find().then(
    (result)=>{
        if(result){
            return{
                status:true,
                statusCode:200,
                products:result
            }
        }
        else{
            return{
            status:false,
            statusCode:404,
            message:'no products found'
                
        }
    }
}
  )
}

const addtowishlist=(id,title,price,image,description)=>{
    return db.Wishlist.findOne({id}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message:"product already exist"
                }
            }
            else{
                const newProduct = new db.Wishlist({ id,title,price,image,description })
                newProduct.save()
                return{
                    status:true,
                    statusCode:200,
                    message:"product added to wishlist"
                }
            }
        }
    )
}

//to get wishlist

const getwishlist =()=>{
    return db.Wishlist.find().then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    products:result
                }
            }
            else{
                return{
                    status:false,
                    statusCode:404,
                    message:'your wishlist is empty'
                }
            }
        }
    )
}
deletewish=(id)=>{
  return db.Wishlist.deleteOne({id}).then(
    (result)=>{
        if(result){
        //     return{
        //     status:true,
        //     statusCode:200,
        //     message:"product deleted"
        //   }
        return db.Wishlist.find().then(
            (result)=>{
                if(result){
                    return{
                        status:true,
                        statusCode:200,
                        products:result,
                        message:"product removed successfully"
                    }
                }
                else{
                    return{
                        status:false,
                        statusCode:404,
                        message:'your wishlist is empty'
                    }
        }
        
    }
        )
}

        else{
            return{
                status:false,
                statusCode:404,
                message:"product not found"
            }
        }
    }
  )
}

module.exports ={
    getProducts,
    addtowishlist,
    getwishlist,
    deletewish
}