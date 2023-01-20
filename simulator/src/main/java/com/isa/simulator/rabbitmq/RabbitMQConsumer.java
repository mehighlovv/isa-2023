package com.isa.simulator.rabbitmq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQConsumer.class);
    private RabbitMQProducer producer;

    @Autowired
    public RabbitMQConsumer(RabbitMQProducer producer) {
        this.producer = producer;
    }

    @RabbitListener(queues = {"${rabbitmq.simulation_queue.name}"})
    public void consume(String message) {
        LOGGER.info(String.format("Received message -> %s", message));

        producer.sendMessage("test");
    }
}
