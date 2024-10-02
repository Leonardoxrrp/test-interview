import { useState } from "react";
import { MANAGE_QUOTA, POWERED_BY_CARAVELO } from "../../utils/constants";

function SubscriptionQuota() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        {MANAGE_QUOTA}
      </button>
      <footer>{POWERED_BY_CARAVELO}</footer>
    </section>
  );
}

export default SubscriptionQuota;
