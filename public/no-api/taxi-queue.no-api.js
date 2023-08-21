document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'no-api-1.0',
			queueCount: 0,
			taxiQueueCount: 0,

			joinQueue() {
				this.queueCount++
			},
			leaveQueue() {
				if(this.queueCount > 0) {
					this.queueCount--
				}
				
			},

			joinTaxiQueue() {
				this.taxiQueueCount++
			},

			queueLength() {

			},

			taxiQueueLength() {

			},

			taxiDepart() {
				if(this.taxiQueueCount > 0 && this.queueCount >= 12) {
					this.taxiQueueCount--
					this.queueCount = this.queueCount - 12
				}
				
			}
		}

	});

});

