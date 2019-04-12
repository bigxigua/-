function Promise(callback) {
    this.status = 'pendding'; // pendding fulfilled rejected
    this.queues = [];
    this.value = undefined;
    callback((value) => {
        onFulfilled(value, this);
    }, (error) => {
        onRejected(error, this);
    });
}
Promise.prototype.setStatus = function(status, value) {
    if (status === 'fulfilled' || status === 'rejected') {
        this.status = status;
        this.queues = [];
        this.value = value;
        this.then((value) => {
        });

    } else {
        // TODO 报错
    }
};
Promise.prototype.then = function(onFulfilled, onRejected) {
    return new Promise();
};

const onFulfilled = function(value, promise) {
    promise.setStatus('fulfilled', value);
}
const onRejected = function(error, promise) {
    promise.setStatus('rejected', value);
}

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000)
}).then((value) => {

}, (error) => {

});
setInterval(() => {
    console.log(p)
}, 500)