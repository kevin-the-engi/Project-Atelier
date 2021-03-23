import http from 'k6/http';
import { check, group, sleep } from 'k6';

const localhost = 'http://127.0.0.1:3000';

export let options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration:['p(100)<2000']
  }
}

export default function () {
  group('Public endpoints', () => {
    let responses = http.batch([
      [
        'GET',
        `${localhost}/products/1`
      ],
      [
        'GET',
        `${localhost}/products/1/styles`
      ],
    ])
  })
  // let response = http.get('http://127.0.0.1:3000/products/1/');

  // check(response, {
  //   'is status 200': (res) => r.status === 200
  // });

  sleep(1);
};
//   return res.body;
// }

// export default function (data) {
//   console.log(JSON.stringify(JSON.parse(data),null,2));
// }