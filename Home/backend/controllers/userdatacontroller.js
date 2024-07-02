import User from "../models/userdataschema.js"

export const storedata = async (req, res) => {
    try {
    
      
      const data = new User({
        userId:req.body.userId,
        doctorId:req.body.doctorId,
        weekNo:req.body.weekNo,
        issue:req.body.issue,
        date:req.body.date,
        pdf:req.body.pdf,
        image: req.body.image,
        cnic:req.body.cnic,
        doctorname:req.body.doctorname,
      });
     
      await data.save();
  
    
    } catch (error) {
      console.error('Error creating User Data', error);
      res.status(500).json({ success: false, message: "Error creating User data" });
    }
  };

  export const searchuser = async (req, res) => {
    
    const cnic =req.query.cnic;
    const id=req.query.doctorId;


  console.log(id);
  console.log(cnic);
  try {
    // Fetch patient data based on CNIC and doctor ID
    const data = await User.find({ cnic: cnic, doctorId: id }).exec();
    

    // Send the fetched data as response
    res.status(201).json({ success: true, message: "User Data Found successfully",data  });
  } catch (error) {
    console.error('Error searching patients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  };

  export const searchuser_pat = async (req, res) => {
    
   
    const id=req.query.userId;


  console.log(id);
 
  try {
    
    const data = await User.find({ userId: id });
    

   
    res.status(201).json({ success: true, message: "User Data Found successfully",data  });
  } catch (error) {
    console.error('Error searching patients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  };