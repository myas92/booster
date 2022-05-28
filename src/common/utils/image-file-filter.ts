import {BadRequestException, InternalServerErrorException, NotFoundException} from "@nestjs/common";
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new  InternalServerErrorException('EXC_7BC0F593 | Only image files are allowed! [jpg|jpeg|png]'), false);
    }
    callback(null, true);
};
export const imageAndPdfFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|bmp|pdf|docs)$/)) {
        return callback(new  InternalServerErrorException('EXC_013256EC | Only this files are allowed! [jpg|jpeg|png|bmp|webp|pdf|docs|txt]'), false);
    }
    callback(null, true);
};
