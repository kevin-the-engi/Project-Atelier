import http from 'k6/http';
import { check, group, sleep } from 'k6';

const localhost = 'http://ec2-3-101-110-210.us-west-1.compute.amazonaws.com';

export let options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration:['p(100)<2000']
  },
  stages: [
    { duration: '60s', target: 1000 },
    { duration: '180s', target: 1000 },
    { duration: '60s', target: 0 },
  ],
}

export default function () {
  let response = http.get(localhost + '/products/');

  // check(response, {
  //   'is status 200': (res) => r.status === 200
  // });

  sleep(1);
};
