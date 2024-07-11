'use client'

import Image from 'next/image'
import styles from './business.module.css'
import Navbar from '../../../components/navbar/Navbar'
import ProcessBox from '../../../components/Auth/process/ProcessBox'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '../../../components/footer/Footer'

const status = {
    stepCompletion: 0,
    business: false,
    contact: false,
    location: false
  }


const Business = () => {


  const [businessName, setBusinessName] = useState('');
  const [businessError, setBusinessError] = useState(false);
  const [registrationNo, setRegistrationNo] = useState('');
  const [registrationError, setregistrationError] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const fileInputRef = useRef(null);

  const router = useRouter();

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleNext = () => {

    let hasError = false;

    if(!businessName){
      setBusinessError(true);
      hasError = true
    } else {
      setBusinessError(false);
    }

    if(!registrationNo){
      setregistrationError(true);
      hasError = true
    } else {
      setregistrationError(false);
    }

    if(!logo){
      setLogoError(true);
      hasError = true
    } else {
      setLogoError(false);
    }

    if(!hasError){
      router.push('/contact_information')
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Navbar />
        <div className={styles.imageContainer}>
          <Image src='/images/image.png' alt='' fill className={styles.img}/>
        </div>
      </div>
      <div className={styles.bottom}>
        <ProcessBox step={status}/>

        <div className={styles.desc}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>Business Information</div>
            <div className={styles.subtitle}>Basic business details</div>
          </div>
          <div className={styles.status}>
            <button className={styles.edit}><EditOutlinedIcon className={styles.editicon}/>Edit</button>
            <div className={styles.progress}>
              <div className={styles.icon}>
                  <ErrorRoundedIcon className={styles.erricon}/>
              </div>
              <div className={styles.detail}>
                  <p>In Progress</p>
                  <p>Fill all the fields</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.input}>
          <div className={styles.business}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '50%' },
              }}
              noValidate
              autoComplete="off"
            >
            <div>
              <TextField
                error={businessError}
                id="outlined-required"
                label="Enter Your Business name:"
                color='warning'
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                helperText={businessError ? "Please enter your business name" : ""}
             />
            </div>
            <div>
              <TextField
                error={registrationError}
                id="outlined-required"
                label="Your Business Registration No:"
                color='warning'
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                helperText={registrationError ? "Please enter your business ragistration number" : ""}
             />
            </div>
            </Box>
          </div>
          <div className={styles.upload}>
            <div className={styles.head}>UPLOAD YOUR COMPANY LOGO</div>
            <div className={styles.logoInput} onClick={handleImageClick}>
              <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  className={styles.logo}
                  onChange={handleLogoChange}
                  ref={fileInputRef}
                />
                {!logo && (
                  <div className={styles.logoLabel}>+</div>
                )}
                {logo && (
                  <img src={logo} alt="Company Logo" className={styles.previewImage} />
                )}
            </div>
            <div className={styles.logoerr}>
              {logoError ? "Please input company logo" : ""}
            </div>
          </div>
        </div>

        <div className={styles.options}>
          <button className={styles.btn}>
            <UploadFileIcon />
            Draft
          </button>
          <button className={styles.btn} onClick={handleNext}>
            Next
            <ArrowForwardIcon  />
          </button>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Business