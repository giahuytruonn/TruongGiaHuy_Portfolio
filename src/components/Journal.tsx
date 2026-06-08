import React, { useState } from 'react';
import { BookOpen, X, ArrowUpRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: React.ReactNode;
}

export const Journal: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'outbox-pattern',
      title: 'Reliable Event Delivery: Implementing the Transactional Outbox Pattern with Kafka',
      category: 'System Architecture',
      date: 'May 28, 2026',
      readTime: '5 min read',
      excerpt: 'In a distributed ticket booking system like DiVeNha, updating databases and publishing events to Kafka atomically is critical. Here is how we used PostgreSQL and Kafka Connect to build a reliable transactional pipeline.',
      content: (
        <div className="space-y-6 text-[#6F6F6F] font-body text-sm leading-relaxed">
          <p>
            When booking tickets in a microservices ecosystem, we face a common challenge: we must save the booking details to the booking database, and then notify other services (like notification or billing) via Kafka.
          </p>
          <p className="font-semibold text-black">The Problem: Non-Atomic Operations</p>
          <p>
            If we write to the database and then immediately publish to Kafka, we risk inconsistency. If the Kafka broker is down or the network fails, the booking database transaction commits, but the event is lost. Conversely, if we publish first and the database transaction fails, downstream services process a booking that doesn't exist.
          </p>
          <p className="font-semibold text-black">The Solution: Transactional Outbox</p>
          <p>
            We resolved this in <strong>DiVeNha</strong> by writing an Outbox record to a dedicated database table within the <i>same</i> local transaction as the booking entity. Since relational databases support atomic multi-table writes, this is 100% reliable.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 font-mono text-xs text-black space-y-2">
            <div>// Booking Service Transactional Boundary</div>
            <div>@Transactional</div>
            <div>public BookingResponse createBooking(BookingRequest req) {"{"}</div>
            <div className="pl-4">Booking booking = bookingRepository.save(new Booking(req));</div>
            <div className="pl-4">OutboxRecord outbox = new OutboxRecord("BookingCreatedEvent", booking.getId(), toJson(booking));</div>
            <div className="pl-4">outboxRepository.save(outbox);</div>
            <div className="pl-4">return mapToResponse(booking);</div>
            <div>{"}"}</div>
          </div>
          <p>
            An asynchronous worker (a polling process or Kafka Connect Debezium) then polls the `outbox` table, streams the records directly into Kafka, and removes or marks them as processed once acknowledged. This guarantees <strong>at-least-once delivery</strong> to Kafka without sacrificing performance.
          </p>
        </div>
      )
    },
    {
      id: 'distributed-locks',
      title: 'Mitigating Double Bookings using Redis and Redisson Distributed Locks',
      category: 'Scalability & Caching',
      date: 'April 15, 2026',
      readTime: '4 min read',
      excerpt: 'High-concurrency ticket reservations suffer from race conditions. This article details the implementation of atomic seat allocations using Redisson distributed locks inside Spring Boot.',
      content: (
        <div className="space-y-6 text-[#6F6F6F] font-body text-sm leading-relaxed">
          <p>
            During popular trip launches, hundreds of users may attempt to reserve the exact same seat simultaneously. A naive system checks database availability, finds the seat free, and books it—allowing multiple threads to write concurrently, resulting in double bookings.
          </p>
          <p className="font-semibold text-black">Why standard Database Isolation levels fail</p>
          <p>
            Even with `SERIALIZABLE` isolation, database locks can create deadlocks under heavy loads, severely degrading application throughput.
          </p>
          <p className="font-semibold text-black">Redisson Distributed Locking</p>
          <p>
            To resolve this in the ticket booking engine, we implemented distributed locks via <strong>Redisson</strong>. Redisson provides a robust Java wrapper for Redis commands, implementing the Redlock algorithm and utilizing Redis pub/sub to wait for lock releases efficiently without CPU polling loops.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 font-mono text-xs text-black space-y-2">
            <div>// Concurrency Guard with Redisson</div>
            <div>RLock lock = redissonClient.getLock("seat-lock:" + seatId);</div>
            <div>try {"{"}</div>
            <div className="pl-4">// Wait for lock up to 5s, auto-expire after 10s</div>
            <div className="pl-4">boolean acquired = lock.tryLock(5, 10, TimeUnit.SECONDS);</div>
            <div className="pl-4">if (acquired) {"{"}</div>
            <div className="pl-8">validateAndReserveSeat(seatId, userId);</div>
            <div className="pl-4">{"}"}</div>
            <div>{"}"} finally {"{"}</div>
            <div className="pl-4">if (lock.isHeldByCurrentThread()) lock.unlock();</div>
            <div>{"}"}</div>
          </div>
          <p>
            This setup limits resource contention to memory speed in Redis. Only the thread holding the lock executes the booking transaction. If the lock is held, other threads wait gracefully. This eliminates double bookings entirely while maintaining sub-second API responses.
          </p>
        </div>
      )
    },
    {
      id: 'payment-integration',
      title: 'Securing Payment Webhooks: A Deep Dive into PayOS Integration',
      category: 'Integrations & Finance',
      date: 'November 10, 2025',
      readTime: '3 min read',
      excerpt: 'Integrating external payment gateways like PayOS introduces complex state syncs. Learn how we built a resilient signature-verifying webhook listener in VietVivu.',
      content: (
        <div className="space-y-6 text-[#6F6F6F] font-body text-sm leading-relaxed">
          <p>
            Payment workflows consist of initiating a transaction, redirecting the user, and receiving a webhook callback from the gateway. If webhooks are unsecured, malicious actors could forge success callbacks to steal bookings.
          </p>
          <p className="font-semibold text-black">Signature Verification & Idempotency</p>
          <p>
            In the **VietVivu** booking site, we addressed this by verifying the HMAC-SHA256 signature attached to every callback payload against our PayOS client secret. Additionally, because gateways can repeat notifications, we ensured the webhook handler is strictly <strong>idempotent</strong>.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 font-mono text-xs text-black space-y-2">
            <div>// Verify PayOS Signature & Process Webhook</div>
            <div>public ResponseEntity&lt;String&gt; handleWebhook(@RequestBody PayosWebhookPayload payload) {"{"}</div>
            <div className="pl-4">boolean isValid = payosService.verifySignature(payload);</div>
            <div className="pl-4">if (!isValid) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid signature");</div>
            <div className="pl-4"></div>
            <div className="pl-4">// Query existing payment log to ensure idempotency</div>
            <div className="pl-4">PaymentLog payment = paymentLogRepository.findByTransactionId(payload.getTxId());</div>
            <div className="pl-4">if (payment.isProcessed()) return ResponseEntity.ok("Success (Duplicate)");</div>
            <div className="pl-4"></div>
            <div className="pl-4">bookingService.confirmPaymentAndActivate(payload.getBookingId());</div>
            <div className="pl-4">return ResponseEntity.ok("Success");</div>
            <div>{"}"}</div>
          </div>
          <p>
            This ensures that our databases stay synced with the financial reality, shielding our backend routes from exploitation.
          </p>
        </div>
      )
    }
  ];

  return (
    <section id="journal" className="relative bg-white py-32 px-8 z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-[#6F6F6F] font-body text-sm tracking-widest uppercase block mb-3">// KNOWLEDGE JOURNAL</span>
          <h2 className="font-display text-5xl md:text-7xl text-black font-normal tracking-tight">
            Engineering logs & <span className="italic text-[#6F6F6F]">insights.</span>
          </h2>
        </div>

        {/* Editorial Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="flex flex-col justify-between border-t border-gray-200 pt-6 group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-body uppercase text-[#6F6F6F] tracking-wider">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-display text-2xl text-black group-hover:text-[#6F6F6F] transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="font-body text-sm text-[#6F6F6F] line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <button
                onClick={() => setSelectedArticle(article)}
                className="mt-8 inline-flex items-center gap-1.5 text-xs font-body font-semibold uppercase text-black tracking-widest group/btn hover:text-[#6F6F6F] transition-colors duration-200"
              >
                Read Entry <ArrowUpRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </article>
          ))}
        </div>

      </div>

      {/* Article Modal Overlay */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 shadow-2xl animate-fade-rise duration-300 relative border border-gray-100"
          >
            {/* Modal Close */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-body uppercase tracking-widest text-[#6F6F6F] block">
                {selectedArticle.category} • {selectedArticle.date}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-black font-normal leading-tight pr-8">
                {selectedArticle.title}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="border-t border-gray-100 pt-6">
              {selectedArticle.content}
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-xs font-body text-[#6F6F6F]">
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-black" /> {selectedArticle.readTime}</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="rounded-full px-5 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
