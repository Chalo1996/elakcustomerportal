import { Modal, Button, Row, Divider } from "antd";

const FuneralExclusionsModal = ({
  isModalOpen,
  setIsModalOpen,
  onCancel,
  setIsPolicyChecked,
}) => {
  const customTitle = (
    <p className={`text-lg font-medium text-left font-roboto `}>Exclusions</p>
  );

  const handleExclusion = () => {
    setIsPolicyChecked(true);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={customTitle}
      open={isModalOpen}
      onCancel={onCancel}
      style={{
        width: "741px",
        height: "710px",
        gap: "0px",
        opacity: "1",
      }}
      footer={[
        <Row justify="end" key="footer-row">
          <Divider />
          <Button
            onClick={handleExclusion}
            key="close"
            type="primary"
            className={`shadow-none`}
          >
            I agree
          </Button>
        </Row>,
      ]}
    >
      <Divider />
      <div>
        <p>
          This Policy does not cover any of the Benefits stated herein if a
          claim event in respect of a Life Assured is caused by, is a
          consequence of or is contributed by, whether directly or indirectly,
          any of the following:
        </p>
      </div>

      <div>
        <ol className="text-[#929497] space-y-4 list-decimal list-inside">
          <li>
            Active risks of war or war-like operations (whether war be declared
            or not), acts of foreign enemy, civil war or commotion, mutiny,
            riot, insurrection, rebellion, revolution, terrorism, military or
            usurped power, where the Life Assured was an active participant.
          </li>
          <li>Active participation in riots, strikes or civil insurrection.</li>
          <li>
            A consequence of the execution of a judicial sentence of death.
          </li>
          <li>Participation in any criminal act.</li>
          <li>
            Nuclear, biological, or chemical weapons, materials or attacks or
            from the release of radioactivity or nuclear, biological or chemical
            warfare agents, including instances where release has happened by
            the use of information technology, or from ionizing radiations or
            contamination by radioactivity from any nuclear fuel, material or
            waste from the combustion of any nuclear fuel. For the purposes of
            this exclusion, combustion shall include any self-sustaining process
            or nuclear fusion.
          </li>
        </ol>
      </div>
    </Modal>
  );
};

export default FuneralExclusionsModal;
