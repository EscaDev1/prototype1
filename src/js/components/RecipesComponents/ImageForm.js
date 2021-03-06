import React from "react";
import styled from "styled-components";


//Styled Div to hold the whole image input 
const ImageInput = styled.div`
    height: 100%;
    width: 100%;
    background-color: lightgray;
    box-sizing:border-box;
    position:relative;
    
`;

//Style div to hold either the placeholder
const Holder = styled.div`
    height:25%;
    width: 25%;
    position: absolute;
    box-sizing:border-box;
    top:37.5%;
    left:37.5%;
`;
const FileInput = styled.input`
    display:none;
`;
const Thumbnail = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
//potentially change to props
const Image = ({ data}) => <Thumbnail alt="Recipe thumbnail" src={data} />;




let FileField = ({name,value,setFieldValue, size})=> {
    const [current, setCurrent] = React.useState(value);  
    React.useEffect(()=>{
        name && setFieldValue && setFieldValue(name,current);
    }, [name, current, setFieldValue]);
    

    return (
        <label className="image-form">
            <ImageInput>
                <FileInput 
                type="file"
                onChange={value=>{toBase64(value.currentTarget.files[0]).then(v=>setCurrent(v))}}
                />
                {current?<Image data={current}/>:
                    <Holder extra size={size}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                < path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                </svg>
                
                </Holder>
                }
                
            </ImageInput>
        </label>
    );
}

const withField = Component => ({ field, form, ...props }) => (
    <Component {...field} {...form} {...props} />
  );

  FileField = withField(FileField);

  export {FileField, Image};