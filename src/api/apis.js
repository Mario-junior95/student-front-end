import axios from "../api/axios";

//get All Students data
const getAllDataStudents = (props) => {
  const { pathname, setState } = props;

  return async () => {
    try {
      await axios.get(pathname).then((response) => {
        setState(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//get All Classes
const getAllClasses = (props) => {
  const { pathname, isMount, setState } = props;

  return async () => {
    try {
      const response = await axios.get(pathname);
      isMount && setState(response.data);
    } catch (error) {
      console.log(error);
    }
  };
};

//get classes By id
const getClassById = (props) => {
  const { pathname, isMount, state, setState, setLoading } = props;
  return async () => {
    try {
      const response = await axios.get(pathname);
      isMount &&
        setState({
          ...state,
          name: response.data.department[0].name,
          description: response.data.department[0].description
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
};

//get All departments
const getAllDeparments = (props) => {
  const { pathName, setState , setLoading } = props;

  return async () => {
    try {
      await axios.get(pathName).then((response) => {
        setState(response.data.parents);
      }).finally(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { getAllDataStudents, getAllClasses, getClassById, getAllDeparments };
