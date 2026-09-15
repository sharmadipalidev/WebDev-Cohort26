import { processRailwayPNR } from '../src/12-railway-pnr-system.js';

describe('12 - Indian Railway PNR Status System (9 pts)', () => {

  const basePNR = {
    pnr: "1234567890",
    train: { number: "12301", name: "Rajdhani Express", from: "NDLS", to: "HWH" },
    classBooked: "3A",
    passengers: [
      { name: "Rahul Kumar", age: 28, gender: "M", booking: "B1", current: "B1" }
    ]
  };

  describe('PNR formatting', () => {
    test('PNR formatted as 3-3-4 with dashes', () => {
      const result = processRailwayPNR(basePNR);
      expect(result.pnrFormatted).toBe("123-456-7890");
    });

    test('PNR with all zeros', () => {
      const result = processRailwayPNR({ ...basePNR, pnr: "0000000000" });
      expect(result.pnrFormatted).toBe("000-000-0000");
    });
  });

  describe('Train info template literal', () => {
    test('trainInfo formatted correctly', () => {
      const result = processRailwayPNR(basePNR);
      expect(result.trainInfo).toBe("Train: 12301 - Rajdhani Express | NDLS → HWH | Class: 3A");
    });
  });

  describe('Passenger status detection', () => {
    test('Current "B1" (berth) => CONFIRMED', () => {
      const result = processRailwayPNR(basePNR);
      expect(result.passengers[0].statusLabel).toBe("CONFIRMED");
      expect(result.passengers[0].isConfirmed).toBe(true);
    });

    test('Current "S5" (seat) => CONFIRMED', () => {
      const pnr = {
        ...basePNR,
        passengers: [{ name: "Test", age: 30, gender: "M", booking: "S5", current: "S5" }]
      };
      const result = processRailwayPNR(pnr);
      expect(result.passengers[0].statusLabel).toBe("CONFIRMED");
    });

    test('Current "WL8" => WAITING', () => {
      const pnr = {
        ...basePNR,
        passengers: [{ name: "Test", age: 30, gender: "M", booking: "WL12", current: "WL8" }]
      };
      const result = processRailwayPNR(pnr);
      expect(result.passengers[0].statusLabel).toBe("WAITING");
      expect(result.passengers[0].isConfirmed).toBe(false);
    });

    test('Current "CAN" => CANCELLED', () => {
      const pnr = {
        ...basePNR,
        passengers: [{ name: "Test", age: 30, gender: "M", booking: "B1", current: "CAN" }]
      };
      const result = processRailwayPNR(pnr);
      expect(result.passengers[0].statusLabel).toBe("CANCELLED");
    });

    test('Current "RAC2" => RAC', () => {
      const pnr = {
        ...basePNR,
        passengers: [{ name: "Test", age: 30, gender: "M", booking: "RAC5", current: "RAC2" }]
      };
      const result = processRailwayPNR(pnr);
      expect(result.passengers[0].statusLabel).toBe("RAC");
    });
  });

  describe('Formatted name', () => {
    test('Name padded to 20 chars with age/gender suffix', () => {
      const result = processRailwayPNR(basePNR);
      // "Rahul Kumar" = 11 chars, padEnd(20) = "Rahul Kumar         "
      expect(result.passengers[0].formattedName).toBe("Rahul Kumar         (28/M)");
    });

    test('Booking and current status preserved', () => {
      const result = processRailwayPNR(basePNR);
      expect(result.passengers[0].bookingStatus).toBe("B1");
      expect(result.passengers[0].currentStatus).toBe("B1");
    });
  });

  describe('Summary statistics', () => {
    test('All confirmed passengers', () => {
      const pnr = {
        ...basePNR,
        passengers: [
          { name: "A", age: 20, gender: "M", booking: "B1", current: "B1" },
          { name: "B", age: 25, gender: "F", booking: "B2", current: "B2" }
        ]
      };
      const result = processRailwayPNR(pnr);
      expect(result.summary).toEqual({
        totalPassengers: 2, confirmed: 2, waiting: 0, cancelled: 0, rac: 0,
        allConfirmed: true, anyWaiting: false
      });
    });

    test('Mixed statuses counted correctly', () => {
      const pnr = {
        ...basePNR,
        passengers: [
          { name: "A", age: 20, gender: "M", booking: "B1", current: "B1" },
          { name: "B", age: 25, gender: "F", booking: "WL5", current: "WL3" },
          { name: "C", age: 30, gender: "M", booking: "B3", current: "CAN" },
          { name: "D", age: 35, gender: "F", booking: "RAC1", current: "RAC1" }
        ]
      };
      const result = processRailwayPNR(pnr);
      expect(result.summary.totalPassengers).toBe(4);
      expect(result.summary.confirmed).toBe(1);
      expect(result.summary.waiting).toBe(1);
      expect(result.summary.cancelled).toBe(1);
      expect(result.summary.rac).toBe(1);
      expect(result.summary.allConfirmed).toBe(false);
      expect(result.summary.anyWaiting).toBe(true);
    });
  });

  describe('Chart prepared', () => {
    test('All confirmed => chartPrepared true', () => {
      const result = processRailwayPNR(basePNR);
      expect(result.chartPrepared).toBe(true);
    });

    test('Has waiting passenger => chartPrepared false', () => {
      const pnr = {
        ...basePNR,
        passengers: [
          { name: "A", age: 20, gender: "M", booking: "B1", current: "B1" },
          { name: "B", age: 25, gender: "F", booking: "WL5", current: "WL3" }
        ]
      };
      const result = processRailwayPNR(pnr);
      expect(result.chartPrepared).toBe(false);
    });

    test('Cancelled + confirmed => chartPrepared true (cancelled excluded)', () => {
      const pnr = {
        ...basePNR,
        passengers: [
          { name: "A", age: 20, gender: "M", booking: "B1", current: "B1" },
          { name: "B", age: 25, gender: "F", booking: "B2", current: "CAN" }
        ]
      };
      const result = processRailwayPNR(pnr);
      expect(result.chartPrepared).toBe(true);
    });

    test('RAC passenger => chartPrepared false', () => {
      const pnr = {
        ...basePNR,
        passengers: [
          { name: "A", age: 20, gender: "M", booking: "B1", current: "B1" },
          { name: "B", age: 25, gender: "F", booking: "RAC1", current: "RAC1" }
        ]
      };
      const result = processRailwayPNR(pnr);
      expect(result.chartPrepared).toBe(false);
    });
  });

  describe('Multiple passengers', () => {
    test('All passenger fields generated correctly', () => {
      const pnr = {
        ...basePNR,
        passengers: [
          { name: "Rahul", age: 28, gender: "M", booking: "B1", current: "B1" },
          { name: "Priya", age: 25, gender: "F", booking: "WL5", current: "B3" }
        ]
      };
      const result = processRailwayPNR(pnr);
      expect(result.passengers.length).toBe(2);
      expect(result.passengers[0].statusLabel).toBe("CONFIRMED");
      expect(result.passengers[1].statusLabel).toBe("CONFIRMED");
      expect(result.passengers[1].bookingStatus).toBe("WL5");
      expect(result.passengers[1].currentStatus).toBe("B3");
    });
  });

  describe('Validation', () => {
    test('null pnrData returns null', () => {
      expect(processRailwayPNR(null)).toBeNull();
    });

    test('Non-object returns null', () => {
      expect(processRailwayPNR("pnr")).toBeNull();
    });

    test('Missing pnr string returns null', () => {
      expect(processRailwayPNR({ ...basePNR, pnr: undefined })).toBeNull();
    });

    test('PNR not 10 digits returns null', () => {
      expect(processRailwayPNR({ ...basePNR, pnr: "12345" })).toBeNull();
    });

    test('PNR with letters returns null', () => {
      expect(processRailwayPNR({ ...basePNR, pnr: "12345abcde" })).toBeNull();
    });

    test('Missing train returns null', () => {
      expect(processRailwayPNR({ ...basePNR, train: undefined })).toBeNull();
    });

    test('Empty passengers array returns null', () => {
      expect(processRailwayPNR({ ...basePNR, passengers: [] })).toBeNull();
    });

    test('Non-array passengers returns null', () => {
      expect(processRailwayPNR({ ...basePNR, passengers: "none" })).toBeNull();
    });
  });
});
