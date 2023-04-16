import {useState,useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'


function Login() {

    const [formData,setFormData] = useState({
        email:'',
        password:''
    })



    const {email,password} = formData

    const onChange = (e)=>{
        setFormData(
            (prevState)=>({
                ...prevState,
                [e.target.name]:e.target.value

            
        }))
   
    } 



    const onSubmit = e => {
        e.preventDefault()
        // if(password !== password2){
        //     console.log('Passwords do not match')
        // }else{
        //     console.log(formData)
        // }
    }

                     
  
  return <> 
  
  <section className='heading'>
        <h1>
            <FaSignInAlt /> Login
        </h1>
        <p> Login and start swtting posts </p>
  </section>

    <section className='form'>
        <form onSubmit={onSubmit}>
            
            <div className="form-group">
            <input
             type="text"
              className='form-control' 
              name="email"
               id="email" 
               value={email} 
               placeholder='Enter your email'
                onChange={onChange} />
            </div>

            <div className="form-group">
            <input
             type="text"
              className='form-control' 
              name="password"
               id="password" 
               value={password} 
               placeholder='Enter your password'
                onChange={onChange} />
            </div>


           
           

           <div className="formgroup">
            <button type='submit' className='btn btn-block'>
            Submit

            </button>
           </div>

            </form>
            </section>
           
  
  </>
}

export default Login