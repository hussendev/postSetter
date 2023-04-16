import {useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import {useNavigate} from 'react-router-dom'
import {toast } from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import spinner from '../components/spinner'
import {register , reset } from '../features/auth/authSlice'


function Register() {

    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const {name,email,password,password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user,isLoading,isError,isSuccess, message } = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isSuccess||user){
            toast.success(message)
            navigate('/')
            dispatch(reset())
        }
        if(isError){
            toast.error(message)
            dispatch(reset())
        }
    }
    ,[user,isSuccess,isError,message,navigate,dispatch])


    const onChange = (e)=>{
        setFormData(
            (prevState)=>({
                ...prevState,
                [e.target.name]:e.target.value
            
        }))
   
    } 



    const onSubmit = e => {
        e.preventDefault()
        if(password !== password2){
            toast.error('Passwords do not match')
            
        }else{
            const userData = {
                name,
                email,
                password
        }
        dispatch(register(userData))
    }

                        if (isLoading) {
                            return <spinner />
                        }
                            
  
  
}
return <> 
  
  <section className='heading'>
        <h1>
            <FaUser /> Register
        </h1>
        <p> Please create an account </p>
  </section>

    <section className='form'>
        <form onSubmit={onSubmit}>
          

            <div className="form-group">
            <input
             type="text"
              className='form-control' 
              name="name"
               id="name" 
               value={name} 
               placeholder='Enter your name'
                onChange={onChange} />
            </div>
            
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


            <div className="form-group">
            <input
             type="text"
              className='form-control' 
              name="password2"
               id="password2" 
               value={password2} 
               placeholder='Confirm password'
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

export default Register