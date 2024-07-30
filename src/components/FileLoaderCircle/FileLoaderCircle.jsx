import s from './FileLoaderCircle.module.scss';
import { ReactComponent as IconLoadImage } from '../../image/iconLoadImage.svg';
import { ReactComponent as IconDelete } from '../../image/iconDelete.svg';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

function FileLoaderCircle({ file, setFile, type }) {
    const [error, setError] = useState(false);
    const [stage, setStage] = useState('loader');
    const [anim, setAnim] = useState('');
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    
    useEffect(() => {
     setAnim('loader');
    }, [])

    useEffect(() => {
        if (!file?.file && !error) {
            setStage('loader');
            setTimeout(() => {
                setAnim('loader')
            })
            return
        }
        if (file?.file && !error) {
            setStage('file');
            setTimeout(() => {
                setAnim('file')
            })
            return
        }

        if (error) {
            setStage('error');
            setTimeout(() => {
                setAnim('error')
            })
            return
        }
    }, [file])

    const handleWriteFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setFile({
                file: reader.result,
                fileSend: file,
                name: file.name,
                size: file.size / 1048576
            })
        };
    }

    const handleFile = async (e) => {
        const file = e.currentTarget.files[0];
        if (file.size > 15 * 1048576) {
            console.log("большой файл");
            setError(true)
        }
        else {
            setError(false);
            handleWriteFile(file)
            fileInputRef.current && (fileInputRef.current.value = '');
        }
    }

    const handleDrop = (event) => {
        console.log("File(s) dropped");
        setTimeout(() => {setAnim('file')}, 100)
        const file = event.dataTransfer.files[0]
        if (file && (file.type === "image/png" || file.type === "image/gif" || file.type === "image/jpg" || file.type === "image/jpeg")) {
            handleWriteFile(file)
        };
    }

    const handleDeleteImage = () => {
      setFile({}) 
    }

    function fonDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrag = (e) => {
        e.preventDefault();
  
            stage !== 'file' && setAnim('drag');
   
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        if(stage !== 'file') {
            setStage('loader');
            setTimeout(() => {
                setAnim('loader')
            })
        }
       
    }


    return (
        <div onDragOver={fonDragOver} onDragEnter={handleDrag} onDragLeave={handleDragLeave} className={`${s.files} ${type == 'edit' && s.files_edit}`}>
            {stage == 'loader' &&
                <div onDrop={handleDrop} className={`${s.loader} ${anim == 'drag' && s.loader_drag} ${(anim == 'loader' || anim == 'drag') && s.loader_anim}`}>
                  
                    <div className={`${s.container} ${anim == 'drag' && s.container_hiden}`}>
                        <input ref={fileInputRef} id="image-input" type='file' accept=".png,.jpg,.jpeg,.gif" onInput={handleFile}></input>
                        <p className={`${s.text}`}>Перетащите изображение или <label for="image-input">загрузите</label></p>
                    </div>
                    <p className={`${s.text} ${s.text_drag} ${anim == 'drag' && s.text_drag_active}`}>Отпустите файл здесь...</p>
                </div>
            }

            {stage == 'file' &&
                <div className={`${s.result} ${anim == 'file' && s.result_anim}`}>
                    <div className={s.file}>
                        <div className={s.image}>
                            <img src={file?.file}></img>
                        </div>
                    </div>
                </div>
            }

            {stage == 'error' &&
                <div className={`${s.error} ${anim == 'error' && s.error_anim}`}>

                    <p>Размер файла не должен превышать 15 MB</p>
                    <input ref={fileInputRef} id="image-input" type='file' accept=".png,.jpg,.jpeg,.gif" onInput={handleFile}></input>
                    <label for="image-input">загрузить другое изображение</label>
                </div>
            }
        </div>

    )
};

export default FileLoaderCircle;