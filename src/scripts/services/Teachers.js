import axios from "axios";
import * as urls from "../config";

export function getTeachers(id) {
  const service = `${urls.TEACHERS}?type=${id}`;
  return axios
    .get(service)
    .then(response => response.data.registers)
    .catch(error => {
      // console.log(error);
    });
}

export function searchTeacher(type, keyword) {
  let service;
  if (type !== "") service = `${urls.TEACHERS}?type=${type}&q=${keyword}`;
  else service = `${urls.TEACHERS}?type=all&q=${keyword}`;
  return axios.get(service);
}

export function getTeacher(id) {
  const service = `${urls.TEACHERS}?type=all&id=${id}`;
  return axios
    .get(service)
    .then(response => response.data.registers)
    .catch(error => {
      // console.log(error);
    });
}
