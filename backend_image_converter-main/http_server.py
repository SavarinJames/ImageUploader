from fastapi import FastAPI, UploadFile, File, Response
import os
import cv2
import json

app = FastAPI()
command = 'python fast_neural_style/neural_style/neural_style.py eval --content-image {} --model {} --output-image {} --cuda 0'
dirs_model = ['fast_neural_style/saved_models/blame.model',
              'fast_neural_style/saved_models/yuumei.model',
              'fast_neural_style/saved_models/candy.pth',
              'fast_neural_style/saved_models/mosaic.pth',
              'fast_neural_style/saved_models/rain_princess.pth',
              'fast_neural_style/saved_models/udnie.pth']
output_image_dir = 'fast_neural_style/images/output-images'
input_image_dir = 'fast_neural_style/images/content-images'

@app.post('/style_transfer')
async def upload_file(file: UploadFile = File(...)):
    input_image = f'{input_image_dir}/{file.filename}'
    with open(input_image, 'wb') as image:
        content = await file.read()
        image.write(content)
        image.close()
    path = []
    for model in dirs_model[2:]:
        model_names = model.split('/')[-1]
        out_img_path = f'{output_image_dir}/{file.filename[:-4]}_{model_names[:-4]}.png'
        path .append(out_img_path)
        os.system(command.format(input_image, model, out_img_path))
    # os.remove(input_image)

    images = []
    for p in path:
        images.append(cv2.imread(p))
        # os.remove(p)
    print(images)
    return Response(content=images, media_type="application/png")


@app.get('/')
def root():
    value = {
        "name" : "Tao",
        "action": "ky",
        "object": "nguc fan, 2k3, 2 em Tay"
    }
    return Response(json.dumps(value))
