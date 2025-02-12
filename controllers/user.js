const User = require('../models/User')

  module.exports = {
    //get all users
    index: async (req, res) => {
      try {
        const users = await User.find()
        if(users.length > 0){
          res.status(200).json({
            status: true,
            data: users,
            method: req.method,
            url: req.url
          })
        }else{
          res.json({
            status: false,
            message: "data masih kosong"  
          })
        }
        
      } catch (error) {
        res.status(400).json({sucess: false})
        console.log(error)
      }
        
      },
      //get 1 user
      show: async (req, res) => {
        try {
          const user = await User.findById(req.params.id)
          res.json({
            status: true,
            data: user,
            method: req.method,
            url: req.url,
            message: "data berhasil didapat"
          })
        } catch (error) {
          res.status(400).json({ success: false })
          console.log(error)
        }
      },
      store: async (req, res) => {
        try {
          console.log("Received Data:", req.body);
          const user = await User.create(req.body)
          res.status(200).json({
              status: true,
              data: user,
              method: req.method,
              url: req.url,
              message: "Data berhasil ditambah."

          })
        } catch (error) {
          res.status(400).json({ success: false })
          console.log(error)
        }
        
      },
      update: async (req, res) => {
        try {
          const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
          })
          res.json({
            status: true,
            data: user,
            method: req.method,
            url: req.url,
            message: "data berhasil diubah"
          })
        } catch (error) {
          res.status(400).json({ success: false })
          console.log(error)
        }
      },
      delete: async (req, res) => {
        try {
          await User.findByIdAndDelete(req.params.id)
          res.json({
            status: true,
            method: req.method,
            url: req.url,
            message: "data berhasil dihapus"
          })
        } catch (error) {
          res.status(400).json({ success: false })
          console.log(error)
        }
      }
  }