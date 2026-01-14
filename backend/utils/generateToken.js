import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

export const generateApplicationNumber = () => {
  const prefix = 'DMPS';
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${year}${random}`;
};

export const generateAdmissionNumber = () => {
  const prefix = 'ADM';
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${year}${random}`;
};

export const generateEmployeeId = () => {
  const prefix = 'EMP';
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${year}${random}`;
};

export const generateReceiptNumber = () => {
  const prefix = 'REC';
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${year}${random}`;
};









