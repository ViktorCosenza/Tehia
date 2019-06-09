from models import Darknet
from utils.utils import *
from utils.datasets import pad_to_square
from PIL import Image

from torchvision import transforms
import sys

weights_path = 'weights/yolov3.weights'
model = Darknet(config_path="config/yolov3.cfg", img_size=416)
model.load_darknet_weights(weights_path)
img_path  = '../imgs/traffic.jpg'

label_file = "data/coco.names"
classes = load_classes(label_file)
vehicles = [2, 3, 5, 7]
transform = transforms.ToTensor()


def get_vehicles(img_path, conf_thres=0.8):
    img = Image.open(img_path)
    img = transform(img)
    img = F.interpolate(img.unsqueeze(0), size=416, mode="nearest").squeeze(0)
    result = model(torch.unsqueeze(img, 0))
    (result, ) = non_max_suppression(result, conf_thres, 0.4)
    count = 0
    if result is None:
        return 0
    for instance in result:
        if instance[6] in vehicles:
            count += 1
    return count


import argparse
import os.path as osp
import os

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    #parser.add_argument("--image_file", type=str, default="def", help="path to dataset")
    parser.add_argument("--conf_thres", type=float, default=0.8, help="object confidence threshold")
    opt = parser.parse_args()
    #assert opt.image_file != "def", "Must provide path to image"
    
    imgs = os.listdir('../imgs')
    csv_path = '../vehicle_count.csv'
    if osp.isfile(csv_path):
        os.remove(csv_path)
    with open(csv_path, 'a') as f:
        for img in imgs:
            vehicle_count = get_vehicles(osp.join('..', 'imgs', img), opt.conf_thres)    
            f.write(str(vehicle_count))
            f.write(',')