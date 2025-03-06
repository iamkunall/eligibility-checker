import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const fetcher = ({ url, args }: any) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      id: args.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (r) => {
    return await r.json();
  });

// Function to get unique values
function getUniqueValues(data: any, key: any) {
  return [...new Set(data.map((item: any) => item[key]))];
}
function getProjectTypesBySubSector(data: any, subSector: any) {
  return [
    ...new Set(
      data
        .filter((item: any) => item.subSector === subSector)
        .map((item: any) => item.projectType),
    ),
  ];
}

function getProjectSpecificsByProjectTypes(data: any, projectType: any) {
  return [
    ...new Set(
      data
        .filter((item: any) => item.projectType === projectType)
        .map((item: any) => item.projectSpecifics),
    ),
  ];
}

function getDataPointsByProjectSpecifics(data: any, projectSpecifics: any) {
  return [
    ...new Set(
      data
        .filter((item: any) => item.projectSpecifics === projectSpecifics)
        .map((item: any) => {
          return {
            ques: item.dataPoints,
            answer: '',
          };
        }),
    ),
  ];
}

export default function ApplicationForm({ id, createDraft }: any) {
  const { data: frameworkData, isLoading } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/getFramework`,
      args: { id: id },
    },
    fetcher,
  );
  const [sectors, setSectors] = useState<any>([]);
  const [subSectors, setSubSectors] = useState<any>([]);
  const [projectTypes, setProjectTypes] = useState<any>([]);
  const [projectSpecifics, setProjectSpecifics] = useState<any>([]);
  const [dataPoints, setDataPoints] = useState<any>([]);

  const [selectedSubSector, setSelectedSubSector] = useState<string>('');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('');
  const [selectedProjectSpecifics, setSelectedProjectSpecifics] =
    useState<string>('');

  useEffect(() => {
    if (frameworkData && frameworkData.fields) {
      setSectors(getUniqueValues(frameworkData.fields, 'sector'));
      setSubSectors(getUniqueValues(frameworkData.fields, 'subSector'));
    }
  }, [frameworkData]);

  useEffect(() => {
    if (selectedSubSector) {
      if (frameworkData.fields) {
        setProjectTypes(
          getProjectTypesBySubSector(frameworkData.fields, selectedSubSector),
        );
      }
    }
  }, [selectedSubSector]);

  useEffect(() => {
    if (selectedProjectType) {
      if (frameworkData.fields) {
        setProjectSpecifics(
          getProjectSpecificsByProjectTypes(
            frameworkData.fields,
            selectedProjectType,
          ),
        );
      }
    }
  }, [selectedProjectType]);

  useEffect(() => {
    if (selectedProjectSpecifics) {
      if (frameworkData.fields) {
        setDataPoints(
          getDataPointsByProjectSpecifics(
            frameworkData.fields,
            selectedProjectSpecifics,
          ),
        );
      }
    }
  }, [selectedProjectSpecifics]);

  const handleOnChange = (e: any, ques: string) => {
    const updatedData = dataPoints.map((item: any) => {
      if (item.ques === ques) {
        item.answer = e.target.value;
      }
      return item;
    });
    setDataPoints(updatedData);
  };

  return (
    <div>
      <div className="my-10 text-xl">
        <p>1. Select your Sector? </p>
        <div className="mt-4 ml-4">
          <RadioGroup defaultValue={sectors[0]}>
            {sectors.map((item: any) => {
              return (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id="sector" />
                  <Label htmlFor="sector">{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </div>

      <div className="my-10 text-xl">
        <p>2. Select your Sub Sector? </p>
        <div className="mt-4 ml-4">
          <RadioGroup>
            {subSectors.map((item: any) => {
              return (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={item}
                    id="subSector"
                    onClick={() => {
                      setSelectedSubSector(item),
                        setProjectTypes([]),
                        setProjectSpecifics([]);
                      setDataPoints([]);
                    }}
                  />
                  <Label htmlFor="subSector">{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </div>

      {projectTypes && projectTypes.length > 0 && (
        <div className="my-10 text-xl">
          <p>3. Select your Project Type? </p>
          <div className="mt-4 ml-4">
            <RadioGroup>
              {projectTypes.map((item: any) => {
                return (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={item}
                      id="projectType"
                      onClick={() => {
                        setSelectedProjectType(item);
                        setProjectSpecifics([]);
                        setDataPoints([]);
                      }}
                    />
                    <Label htmlFor="projectType">{item}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>
      )}

      {projectSpecifics && projectSpecifics.length > 0 && (
        <div className="my-10 text-xl">
          <p>4. Select your Project Specifics? </p>
          <div className="mt-4 ml-4">
            <RadioGroup>
              {projectSpecifics.map((item: any) => {
                return (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={item}
                      id="projectSpecifics"
                      onClick={() => setSelectedProjectSpecifics(item)}
                    />
                    <Label htmlFor="projectSpecifics">{item}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>
      )}
      {dataPoints.map((item: any, index: number) => {
        return (
          <div className="my-10">
            <p>
              {5 + index}. {item.ques}?{' '}
            </p>
            <Input
              className="mt-2"
              onChange={(e) => handleOnChange(e, item.ques)}
            />
          </div>
        );
      })}

      {dataPoints.length > 0 && (
        <Button
          onClick={() => {
            createDraft({
              sector: sectors[0],
              subSector: selectedSubSector,
              projectType: selectedProjectType,
              projectSpecific: selectedProjectSpecifics,
              dataPoints: dataPoints,
            });
          }}
        >
          Create Draft
        </Button>
      )}
    </div>
  );
}
