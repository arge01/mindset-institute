/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { user as initial } from 'services/login/initial';

export function ProfileCard({ user }) {
  const loginState = useSelector((state) => state.login);

  const [data, setData] = useState(initial);

  useEffect(() => {
    setData(
      user || loginState.login
        ? loginState?.user
        : undefined ||
            JSON.parse(sessionStorage.getItem('user') || '{}') ||
            initial
    );
  }, []);
  return (
    <>
      {data?.id && (
        <Card className="w-96">
          <CardHeader floated={false} className="h-80">
            <img src={data?.image} alt="profile-picture" />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {`${data.firstName} ${data.lastName}`}
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              {`${data.gender}`}
            </Typography>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">
            <Tooltip content="Like">
              <Typography
                as="a"
                href="#facebook"
                variant="lead"
                color="blue"
                textGradient
              >
                <i className="fab fa-facebook" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#twitter"
                variant="lead"
                color="light-blue"
                textGradient
              >
                <i className="fab fa-twitter" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="#instagram"
                variant="lead"
                color="purple"
                textGradient
              >
                <i className="fab fa-instagram" />
              </Typography>
            </Tooltip>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
