import s from './FileLoader.module.scss';
import { ReactComponent as IconLoadImage } from '../../image/iconLoadImage.svg';
import { ReactComponent as IconDelete } from '../../image/iconDelete.svg';
import { useState } from 'react';
import { useRef } from 'react';

function FileLoader() {
    const [fileName, setFileName] = useState('');
    const [fileInput, setFileInput] = useState();
    const [fileSize, setFileSize] = useState(0);
    const [error, setError] = useState(false);
    const fileInputRef = useRef()
  
    const handleFile = async (e) => {

        const file = e.currentTarget.files[0];
        console.log(file.size);
        if (file.size > 15 * 1048576) {
            console.log("большой файл");
            setError(true)
        }
        else {
            setError(false)
            console.log(file.size);
            setFileSize(file.size / 1048576)
            setFileName(file.name);
            getBase64(file);
            fileInputRef.current && (fileInputRef.current.value = '');
        }
    }

    function getBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setFileInput(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

        return reader.result;
    }

    function handleDeleteImage() {
        setFileInput('');
        setFileName('');
    }

    const handleDrop = (event) => {
        
      
        console.log("File(s) dropped");
        console.log(event)
        const file = event.dataTransfer.files[0]
        if (file && (file.type === "image/png" || file.type === "image/gif" || file.type === "image/jpg" || file.type === "image/jpeg")) {
            getBase64(file);
            console.log(file)
            setFileSize(file.size/1048576);
            setFileName(file.name);
        };
    }

    function fonDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
    }

  

    return (
        <div onDragOver={fonDragOver}  className={s.files}>
            {!fileInput && !error &&
                <div onDrop={handleDrop} className={s.loader}>
                    <IconLoadImage />
                    <div className={s.container}>
                        <input  ref={fileInputRef} id="image-input" type='file' accept=".png,.jpg,.jpeg,.gif" onInput={handleFile}></input>
                        <p className={s.text}>Перетащите изображение или <label for="image-input">загрузите</label></p>
                        <p className={s.sub}>Поддерживаемые форматы: PNG, JPG до 15 Мбайт</p>
                    </div>
                </div>
            }

            {fileInput && !error &&
                <div className={s.result}>
                    <div className={s.file}>
                        <img src={fileInput}></img>
                        <div className={s.fileinfo}>
                            <p>{fileName}</p>
                            <span>{fileSize.toFixed(2)} MB</span>
                        </div>
                    </div>
                    <button onClick={handleDeleteImage} className={s.delete}><IconDelete /></button>
                </div>
            }

            {error &&
                <div className={s.error}>
                    
                    <p>Размер файла не должен превышать 15 MB</p>
                    <input ref={fileInputRef} id="image-input" type='file' accept=".png,.jpg,.jpeg,.gif" onInput={handleFile}></input>
                    <label for="image-input">загрузить другое изображение</label>
                </div>
            }
        </div>

    )
};

export default FileLoader;