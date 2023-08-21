document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			passengerQueueLength: 0,
			taxiQueueCount : 0,
			init() {
				this.queueLength()
				this.taxiQueueLength()
			},
			joinQueue() {
				axios.post('/api/passenger/join', {})
				this.init()
			},
			leaveQueue() {
				axios.post('/api/passenger/leave', {})
				this.init()
			},

			joinTaxiQueue() {
				axios.post('/api/taxi/join', {})
				this.init()
			},

			queueLength() {
				axios.get('/api/passenger/queue')
					.then(result => {
						// an example API call
						this.passengerQueueLength = result.data.queueCount
					});
			},

			taxiQueueLength() {
				axios.get('/api/taxi/queue')
				.then((result => {
					this.taxiQueueCount = result.data.queueCount
				}))
			},

			taxiDepart() {
				axios.post('/api/taxi/depart', {})
				this.init()
			}
		}
	});

});

